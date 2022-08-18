import * as os from "os";

export const DEFAULT = {
  servers: {
    web: (config) => {
      return {
        enabled: true,
        secure: false,
        serverOptions: {},
        allowedRequestHosts: process.env.ALLOWED_HOSTS
          ? process.env.ALLOWED_HOSTS.split(",")
          : [],
        port: process.env.PORT || 8080,
        bindIP: "0.0.0.0",
        httpHeaders: {
          "X-Powered-By": config.general.serverName,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods":
            "HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS, TRACE",
          "Access-Control-Allow-Headers": "Content-Type",
          "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
        },
        urlPathForActions: "",
        urlPathForFiles: "public",
        rootEndpointType: "api",
        automaticRoutes: process.env.AUTOMATIC_ROUTES
          ? process.env.AUTOMATIC_ROUTES.split(",")
              .map((v) => v.trim())
              .map((v) => v.toLowerCase())
          : [],
        defaultErrorStatusCode: 500,
        flatFileCacheDuration: 60,
        enableEtag: true,
        saveRawBody: false,
        bootAttempts: 1,
        fingerprintOptions: {
          cookieKey: "sessionID",
          toSetCookie: true,
          onlyStaticElements: false,
          settings: {
            path: "/",
            expires: 3600000,
          },
        },
        formOptions: {
          uploadDir: os.tmpdir(),
          keepExtensions: false,
          maxFieldsSize: 1024 * 1024 * 20,
          maxFileSize: 1024 * 1024 * 200,
        },
        padding: 2,
        metadataOptions: {
          serverInformation: false,
          requesterInformation: false,
        },
        returnErrorCodes: true,
        compress: false,
        queryParseOptions: {},
      };
    },
  },
};

export const production = {
  servers: {
    web: (config) => {
      return {
        padding: null,
        metadataOptions: {
          serverInformation: false,
          requesterInformation: false,
        },
      };
    },
  },
};

export const test = {
  servers: {
    web: (config) => {
      return {
        secure: false,
        port: process.env.PORT
          ? process.env.PORT
          : 18080 + parseInt(process.env.JEST_WORKER_ID || "0"),
        matchExtensionMime: true,
        metadataOptions: {
          serverInformation: true,
          requesterInformation: true,
        },
      };
    },
  },
};
