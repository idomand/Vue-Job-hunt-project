const axios = require("axios");

const url = "http://localhost:3000/jobs/1";
axios.get(url).then((response) => {
  console.log("response :>> ", response.data);
});
