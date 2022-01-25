 // const checkInputOnChange = (e) => {
  //   if (e.target.files.length !== 4) {
  //     setDisable(true);
  //     setWarningMessage("Please upload exactly four (4) images!");
  //   } else {
  //     setDisable(false);
  //     setWarningMessage("");
  //     setFiles(e.target.files);

  //     // New
  //     setObjectUrls([...e.target.files].map((o) => URL.createObjectURL(o)));
  //   }
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   let bodyFormData = new FormData();

  //   for (let i = 0; i < files.length; i++) {
  //     bodyFormData.append("images", files[i]);
  //   }
  //   bodyFormData.append("name", hotelName);
  //   bodyFormData.append("location", location);
  //   bodyFormData.append("price", price);
  //   bodyFormData.append("discount_price", discPrice);
  //   bodyFormData.append("email", email);
  //   bodyFormData.append("phone", phoneNumber);
  //   bodyFormData.append("description", description);

  //   const token = localStorage.getItem("token");

  //   dispatch(
  //     registerHotel("POST", "/api/product/create/hotel", bodyFormData, {
  //       "Content-Type": "multipart/form-data",
  //       Authorization: `Bearer ${JSON.parse(token)}`,
  //     })
  //   );
  // };