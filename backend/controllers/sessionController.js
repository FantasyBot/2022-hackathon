const pool = require("../config/db");
const { sendKycRequest } = require("../utils/kycApis");

// const { status, sessionId } = req.body
// const { status, id?, sessionId?, firstName, lastName, personalNumber ... } = req.body
// ბაზაში, sessions ცხრილში ვეძებთ ჩანაწერს, რომელიც ბოდიში მოსული sessionId ემთხვევა.
// თუ ჩანაწერი ნაპოვნია
// ჩანაწერის status column ს ვააფდეითებთ
// თუ body ში მოსულ ობიექტში status === 'SUCCESS' ესეიგი პროცესი წარმატებულია და შეგვიძლია იუზერის ინფოს განახლება და გააქტიურება
// user ცხრილში ვანახლებთ იმ ჩანაწერს რომელიც ემთხვევა session ცხრილის ჩანაწერის user_id ს

// id: session.id, *
// status: session.status, *
// documentScanStatus: session.documentScanStatus,
// faceMatchStatus: session.faceMatchStatus,
// livenessStatus: session.livenessStatus,
// createdAt: +new Date(session.createdAt),
// livenessStartedAt: +new Date(session?.livenessStartedAt) || null,
// data: session?.data || null, *
// faceMatchLevel: session?.documentScan?.matchLevel || null,
// organization: session.organization,
// clientName: session.clientName,
// comments: session.comments,

// data object
// templateName: string | null;
// templateType: string | null;
// firstName: string | null;
// lastName: string | null;
// placeOfBirth: string | null;
// dateOfExpiration: string | null;
// countryCode: string | null;
// dateOfIssue: string | null;
// dateOfBirth: string | null;
// issuingAuthority: string | null;
// sex: string | null;
// personalNumber?: string | null;
// passportNumber?: string | null;
// cardNumber?: string | null;
// mrzLine: string | null;

// Session
// POST/api/session
// Private
const getKyc = async (req, res, next) => {
  try {
    const { id: singed_user_id } = req.user;
    const kycSession = await sendKycRequest();

    // kycSession -> insert into table sessions,
    // id, user_id, status = defaultValue(null), kyc_session_id(kycSession.sessionId) STRING
    const { rows } = await pool.query(
      "INSERT INTO sessions (session_user_id, session_id) VALUES($1, $2)",
      [singed_user_id, kycSession.sessionId]
    );
    // return kyc session url to user
    res.json({
      url: kycSession.url,
    });
  } catch (err) {
    console.log(err.message);
    res.status(404);
    return next({
      msg: "Session controller failed...",
      stk: err.message,
    });
  }
};

// KYC Webhook
// POST/api/session/kwb
const webHook = async (req, res, next) => {
  //table --> sessions (id, session_user_id, session_id, session_status, session_date)
  try {
    const { id, status, createdAt, data } = req.body;
    const { rows } = await pool.query(
      "SELECT * FROM sessions WHERE session_id=$1",
      [id]
    );
    if (rows[0] && status === "SUCCESS") {
      //Update sessions row - session_status to SUCCESS if req.body.status == "SUCCESS'
      const { rows: sessionUpdate } = await pool.query(
        "UPDATE sessions SET session_status=$1, session_date=$2 WHERE session_id=$2",
        ["SUCCESS", rows[0].session_id, createdAt]
      );
      // check if the req.body.firstname,lastname exists in DB table managers
      // table --> managers (id, manager_fullname, m_hotel_name)
      const { rows: manager_exists } = await pool.query(
        "SELECT manager_fullname FROM managers WHERE manager_fullname=$1",
        [`${data.firstName.toUpperCase()} ${data.lastName.toUpperCase()}`]
      );
      if (manager_exists[0].manager_fullname) {
        const { rows: userUpdate } = await pool.query(
          "UPDATE users SET active=$1 WHERE id=$2",
          [true, rows[0].session_user_id]
        );
      } else {
        return next({
          msg: "successfully verified, failed to find the name in DB...",
        });
      }
    }
  } catch (err) {
    console.log(err.message);
    res.status(404);
    return next({
      msg: "Webhook failed...",
      stk: err.message,
    });
  }
};

module.exports = {
  getKyc,
  webHook,
};
