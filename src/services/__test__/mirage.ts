import { createServer } from "miragejs";
import APIConfig from "../api.config";
import * as forumTestData from "./forumTestData.json";

const sampleCert =
  "-----BEGIN CERTIFICATE-----\nMIIBezCCAS2gAwIBAgJBAME6CH6ihc3o2w9kC9yX8br7wgnlhm0ZjH1kPrnG9DCm\nDJkm9UR5Z6ciyvjuQQTeSN/wQ/SdPlJm4aiYh81uzfswBQYDK2VwMFsxCzAJBgNV\nBAYTAkFVMRMwEQYDVQQIDApTb21lLVN0YXRlMSEwHwYDVQQKDBhJbnRlcm5ldCBX\naWRnaXRzIFB0eSBMdGQxFDASBgNVBAMMC2NvbW1vbiBuYW1lMB4XDTIzMDcxMzA3\nMDAyNloXDTMzMDcxMDA3MDAyNlowLjERMA8GA1UEChMIQ2VhbGd1bGwxGTAXBgNV\nBAsTEENlYWxndWxsIFByb2plY3QwCjAFBgMrZXADAQCjIzAhMB8GA1UdIwQYMBaA\nFKpxV3rhlqRX5kUmv6X8sDx3NMO9MAUGAytlcANBABIHSSJfI1FN+uk4+HjNCrz9\ngn8ZqVzZ4VkwHaix8P37HrW0MG4FdunI1jgCvxtWdUPHd5+NP7D5CBJcusQVhgM=\n-----END CERTIFICATE-----\n";

export function startAuthServer() {
  return createServer({
    environment: "test",
    routes() {
      this.post(APIConfig["auth.email.query"], () => ({
        code: 200,
        message: "ok",
      }));
      this.post(APIConfig["auth.email.verify"], () => ({}));
      this.post(APIConfig["auth.cert.query"], (_schema, request) => {
        if (request.requestHeaders["signature"] === "hack") {
          return {
            cert: sampleCert,
          };
        }
        return {};
      });
    },
  });
}

export function startForumServer() {
  return createServer({
    environment: "test",
    routes() {
      this.post(APIConfig["user.login"], () => ({}));
      this.get(APIConfig["user.profile"], () => {
        return forumTestData["user.profile"];
      });
      this.post(APIConfig["forum.topic.list"], () => {
        return forumTestData["forum.topic.list"];
      });
      this.post(APIConfig["forum.post.list"], () => {
        return forumTestData["forum.post.list"];
      });
      this.get(`${APIConfig["getIpfsSource"]}/*path`, () => {
        return forumTestData["getIpfsText"];
      });
      this.post(APIConfig["forum.topic.create"], () => ({}));
      this.post(APIConfig["forum.post.create"], () => ({}));
    },
  });
}
