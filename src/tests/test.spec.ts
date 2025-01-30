// import chai from "chai";
// const chaiHttp = require("chai-http");
// import { request } from "chai-http";

// import server from "../server";

// chai.use(chaiHttp)
// const { expect } = chai;

// describe("/First test Collection", () => {
//     it("should return a 200 response for the default API route", (done) => {
//         request(server)
//             .get("/api")
//             .end((error, res) => {
//                 expect(res).to.have.status(200);
//                 done();
//             });
//     });

//     it("should compare two values correctly", () => {
//         const expectedValue = 10;
//         const actualValue = 5;
//         expect(expectedValue).not.to.equal(actualValue);
//     });
// });


import chai from "chai";
import chaiHttp, { request } from "chai-http"; // Correct way to import chai-http
import server from "../server";

chai.use(chaiHttp);
const { expect } = chai;

describe("/First test Collection", () => {
  it("should return a 200 response for the default API route", (done) => {
    request(server) // Use chai.request directly
      .get("/api")
      .end((error: any, res:ChaiHttp.Response ) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("should compare two values correctly", () => {
    const expectedValue = 10;
    const actualValue = 5;
    expect(expectedValue).not.to.equal(actualValue);
  });
});
