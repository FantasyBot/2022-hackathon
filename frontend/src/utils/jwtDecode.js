import jwt_decode from "jwt-decode";

const decodeToken = (token) => jwt_decode(token);
export default decodeToken;
