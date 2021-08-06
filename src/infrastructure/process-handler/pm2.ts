import { iProcessArgs, iProcessHandler, iProcessList, iProcessMessageArgs } from "./interface"
import { connect, disconnect, start, restart, stop, list, Proc, sendSignalToProcessName, describe } from 'pm2'
import { iLogger } from "../interfaces/application.interface"
import { rejects } from "assert";

export class ProcessHandler implements iProcessHandler {

    private _logger?: iLogger;
    private readonly _TAG = "***-> Process Handler: ";

    constructor(logger?: iLogger) {
        this._logger = logger
        process.on("SIGTERM", () => {
            this.destructor()
        })
    }

    onDestroyClass() {
        console.log('\n\n***-> Process....\n\n')
        this._logger?.log({
            type: "WARNING",
            tag: this._TAG,
            msg: "Stopped Process Handler"
        })
    }

    async init() {
        return new Promise<void>((resolve, reject) => {
            connect((error) => {
                this._logger?.log({
                    type: !!error ? "ERROR" : "INFO",
                    tag: this._TAG,
                    msg: !!error ? JSON.stringify(error) : "Running"
                })
                !!error ? reject(error) : resolve();
            })
        })
    }

    async run(proc: iProcessArgs) {
        return new Promise<void>((resolve, reject) => {
            start({
                script: proc.filePath,
                name: proc.code,
                env:proc.extras
            }, (err, proc) =>
                this.errProcCallback(err, proc, resolve, reject))
        })

    }

    async stop(procName: string | number) {
        return new Promise<void>((resolve, reject) => {
            stop(procName, (err, proc) =>
                this.errProcCallback(err, proc, resolve, reject))
        })
    }

    async restart(proc: string) {
        return new Promise<void>((resolve, reject) => {
            restart(proc, (err, proc) =>
                this.errProcCallback(err, proc, resolve, reject))
        })
    };

    async getProcess(processName: string | number) {
        return new Promise<iProcessList>((resolve, reject) => {
            reject('TODO')
            // describe(processName, (error, processDescList) => {
            //     !!error && this._logger?.log({
            //         type: "ERROR",
            //         tag: this._TAG,
            //         msg: JSON.stringify(error)
            //     })

            //     !!error ?
            //         reject(error) :
            //         resolve(processDescList.map<iProcessList>((proc) => {
            //             return {
            //                 code: proc.name,
            //                 processId: proc.pm_id,
            //                 processStatus: {
            //                     status: proc.pm2_env?.status,
            //                     cpu: proc.monit?.cpu,
            //                     memory: proc.monit?.memory,
            //                     uptime: proc.pm2_env?.pm_uptime,
            //                     restartTime: proc.pm2_env?.restart_time
            //                 }
            //             }
            //         }));
            // })
        })
    };

    async list() {
        return new Promise<iProcessList[]>((resolve, reject) => {
            list((error, processDescList) => {
                !!error && this._logger?.log({
                    type: "ERROR",
                    tag: this._TAG,
                    msg: JSON.stringify(error)
                })

                !!error ?
                    reject(error) :
                    resolve(processDescList.map<iProcessList>((proc) => {
                        return {
                            code: proc.name,
                            processId: proc.pm_id,
                            processStatus: {
                                status: proc.pm2_env?.status,
                                cpu: proc.monit?.cpu,
                                memory: proc.monit?.memory,
                                uptime: proc.pm2_env?.pm_uptime,
                                restartTime: proc.pm2_env?.restart_time
                            }
                        }
                    }));
            })
        })
    }

    async sendMessage(args: iProcessMessageArgs) {
        return new Promise<void>((resolve, reject) => {
            reject('TODO')
            // restart(args.code, (err, proc) =>
            //     this.errProcCallback(err, proc, resolve, reject))
            // sendSignalToProcessName()
        })
    }

    private errProcCallback(
        error: Error,
        proc: Proc,
        resolve: () => void,
        reject: (reason?: unknown) => void
    ) {
        this._logger?.log({
            type: !!error ? "ERROR" : "INFO",
            tag: this._TAG,
            msg: !!error ?
                JSON.stringify(error) :
                JSON.stringify({
                    process: proc?.name,
                    processId: proc?.pm_id,
                    processStatus: proc?.status
                })
        })
        !!error ? reject(error) : resolve();
    }

    private destructor() {
        disconnect()
        this.onDestroyClass()
    }

}