import xmlrpc from "xmlrpc";

export type RpcClient = ReturnType<typeof createClient>;

export const createClient = ({ url }: { url: string }) => {
    const parse_url = new URL(url);

    if (parse_url.protocol === "https:") {
        return xmlrpc.createSecureClient({ url });
    }

    return xmlrpc.createClient({ url });
};

export const callViaRPC = async <T>(client: RpcClient, method: string, params: any[]): Promise<T> => {
    return new Promise((res, rej) => {
        client.methodCall(method, params, (err: any, val) => {
            if (err) {
                console.log("something went wrong babe", err?.message);
                rej(err);
                return;
            }

            res(val as T);
        });
    });
};
