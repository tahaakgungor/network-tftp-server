import { EventEmitter } from "events";
import { Readable, Writable } from "stream";

export as namespace tftp;
export = tftp;
declare namespace tftp {
    function createServer(): Server;
    function createServer(options: Partial<ServerOptions>): Server;
    function createServer(options: Partial<ServerOptions>, requestListener: (req: GetStream, res: PutStream) => void): Server;

    function createClient(options: Partial<ClientOptions>): Client;

    interface ClientOptions {
        host: string;
        port: number;
        blockSize: number;
        windowSize: number;
        retries: number;
        timeout: number;
    }

    interface ServerOptions extends ClientOptions {
        portRange: { start: number; end: number };
        root: string;
        singlePort: boolean;
        denyGET: boolean;
        denyPUT: boolean;
    }

    class Server extends EventEmitter {
        host: string;
        root: string;
        port: number;
        close(): void;
        listen(): void;
        requestListener(req: GetStream, res: PutStream): void;
        on(event: "close", listener: () => void): this;
        on(event: "error", listener: (err: Error) => void): this;
        on(event: "listening", listener: () => void): this;
        on(event: "request", listener: (req: GetStream, res: PutStream) => void): this;
        on(event: string | symbol, listener: (...args: any[]) => void): this;
    }

    class Client extends EventEmitter {
        createGetStream(remoteFile: string): GetStream;
        createGetStream(remoteFile: string, options: Partial<GetStreamOptions>): GetStream;
        createPutStream(remoteFile: string, options: PutStreamOptions): PutStream;
        get(remoteFile: string, callback: (error: Error) => void): void;
        get(remoteFile: string, localFile: string, callback: (error: Error) => void): void;
        get(remoteFile: string, localFile: string, options: Partial<GetStreamOptions>, callback: (error: Error) => void): void;
        put(remoteFile: string, callback: (error: Error) => void): void;
        put(remoteFile: string, localFile: string, callback: (error: Error) => void): void;
        put(remoteFile: string, localFile: string, options: { userExtensions: UserExtension }, callback: (error: Error) => void): void;
    }

    interface GetStreamOptions {
        md5: string;
        sha1: string;
        userExtensions: UserExtension;
    }

    interface PutStreamOptions {
        size: number;
        userExtensions?: UserExtension;
    }

    class GetStream extends Readable {
        file: string;
        method: "GET" | "PUT";
        stats: Stats;
        abort(error?: string | Error): void;
        close(): void;
        on(event: "abort", listener: () => void): this;
        on(event: "close", listener: () => void): this;
        on(event: "end", listener: () => void): this;
        on(event: "error", listener: (err: Error) => void): this;
        on(event: "finish", listener: () => void): this;
        on(event: "stats", listener: (stats: Stats) => void): this;
        on(event: string | symbol, listener: (...args: any[]) => void): this;
    }

    class PutStream extends Writable {
        setSize(size: number): void;
        setUserExtensions(userExtensions: UserExtension): void;
        abort(error?: string | Error): void;
        close(): void;
        on(event: "abort", listener: () => void): this;
        on(event: "close", listener: () => void): this;
        on(event: "end", listener: () => void): this;
        on(event: "error", listener: (err: Error) => void): this;
        on(event: "finish", listener: () => void): this;
        on(event: "stats", listener: (stats: Stats) => void): this;
        on(event: string | symbol, listener: (...args: any[]) => void): this;
    }

    interface Stats {
        blockSize: number;
        windowSize: number;
        size: number | null;
        userExtensions: UserExtension;
        retries: number;
        timeout: number;
        localAddress: string;
        localPort: number;
        remoteAddress: string;
        remotePort: number;
    }

    interface UserExtension {
        [extension: string]: string;
    }

    const ENOENT = 1;
    const EACCESS = 2;
    const ENOSPC = 3;
    const EBADOP = 4;
    const ETID = 5;
    const EEXIST = 6;
    const ENOUSER = 7;
    const EDENY = 8;
    const ESOCKET = "Invalid remote socket";
    const EBADMSG = "Malformed TFTP message";
    const EABORT = "Aborted";
    const EFBIG = "File too big";
    const ETIME = "Timed out";
    const EBADMODE = "Invalid transfer mode";
    const EBADNAME = "Invalid filename";
    const EIO = "I/O error";
    const ENOGET = "Cannot GET files";
    const ENOPUT = "Cannot PUT files";
    const ERBIG = "Request bigger than 512 bytes (too much extensions)";
    const ECONPUT = "Concurrent PUT request over the same file";
    const ECURPUT = "The requested file is being written by another request";
    const ECURGET = "The requested file is being read by another request";
}
