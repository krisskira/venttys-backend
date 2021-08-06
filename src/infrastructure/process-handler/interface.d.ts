import { ObjectType } from "../interfaces/application.interface";

export type ProcessStatus = "online" | "stopping" | "stopped" | "launching" | "errored" | "one-launch-status"
interface iProcessArgs {
    code: string,
    filePath: string,
    extras: { [key: string]: string }
}

interface iProcessMessageArgs {
    code: string,
    data: object,
}

interface iProcessList {
    code?: string;
    processId?: string | number;
    processStatus?: {
        memory?: number;
        cpu?: number;
        status?: ProcessStatus;
        uptime?: number;
        restartTime?: number;
    };
}

export interface iProcessHandler {
    init: () => Promise<void>;
    run: (process: iProcessArgs) => void;
    stop: (process: string) => Promise<void>;
    restart: (process: string) => Promise<void>;
    list: () => Promise<iProcessList[]>;
    getProcess: (processName: string|number) => Promise<iProcessList>;
    sendMessage: (args: iProcessMessageArgs) => Promise<void>
    onDestroyClass: () => void
}
