"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerRestApp = void 0;
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var routes_1 = require("./routes");
var ServerRestApp = (function () {
    function ServerRestApp(logger, processHandler) {
        var _this = this;
        this._env = 'production';
        this._API_VERSION = '/api/v1';
        this._logger = logger;
        this._processHandler = processHandler;
        var staticPath = path_1.default.join(__dirname, "../../../public");
        var staticSettings = express_1.default.static(staticPath, { maxAge: 31557600000 });
        this._app = express_1.default();
        this._app.use(express_1.default.json());
        this._app.use(function (req, res, next) {
            var context = _this.context({ req: req, res: res });
            _this._app.set('context', context);
            next();
        });
        this._app.use("/public", staticSettings);
        this._app.use(this._API_VERSION, routes_1.pingRouter);
    }
    ServerRestApp.prototype.start = function (args) {
        var _this = this;
        this._env = args.env;
        this._app.listen(args.port, function () {
            var _a;
            (_a = _this._logger) === null || _a === void 0 ? void 0 : _a.log({
                type: "INFO",
                tag: "***-> Server settings (" + _this._env + "):",
                msg: "\n                    \uD83D\uDE80 Server ready at http://localhost:" + args.port + _this._API_VERSION + "/\n                    \uD83D\uDE80 Public dir at http://localhost:" + args.port + "/public\n                ",
            });
        });
    };
    ServerRestApp.prototype.context = function (args) {
        return {
            token: "Pending Token",
            logger: this._logger,
            environment: this._env,
            pubSub: function (_) { return undefined; }
        };
    };
    return ServerRestApp;
}());
exports.ServerRestApp = ServerRestApp;
//# sourceMappingURL=server.js.map