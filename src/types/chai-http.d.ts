// import chai from "chai";
// import chaiHttp from "chai-http";

// // Extend Chai to recognize chai-http's `request`
// declare module "chai" {
//   interface ChaiStatic {
//     request: ChaiHttp.Agent;
//   }

//     export function ChaiStatic(server: Server<IncomingMessage, ServerResponse>) {
//         throw new Error("Function not implemented.");
//     }
// }

// // Apply chaiHttp to chai
// chai.use(chaiHttp);

// export default chai;


// src/types/chai-http.d.ts

// import "chai";  // Import chai to augment the module
// import chaiHttp from "chai-http";

// // Extend Chai to include chai-http's `request` method
// declare module "chai" {
//   interface ChaiStatic {
//     request: ChaiHttp.Agent;
//   }
// }

// // Apply chaiHttp to chai
// chai.use(chaiHttp);

// import chai from "chai";
// import chaiHttp from "chai-http";

// // Extend Chai to recognize chai-http's request method
// declare global {
//   namespace Chai {
//     interface ChaiStatic {
//       request: ChaiHttpRequest;  // This correctly refers to the Agent type, not Request
//     }
//   }
// }

// // Apply chaiHttp to chai
// chai.use(chaiHttp);

// export default chai;

import chai from "chai";
import chaiHttp from "chai-http";
import { Agent, Request } from "chai-http";  // Import types from chai-http

// Extend Chai to add chai-http's `request`
declare module "chai" {
  interface ChaiStatic {
    request: Request;  // Make sure to use the correct type from chai-http
  }
}

// Apply chaiHttp to chai
chai.use(chaiHttp);

export default chai;  // Export chai for use in your tests

