export declare const HashHelper: {
    isPathURLMatchPattern: (path: string, pattern: string) => boolean;
    getPathNames: (pattern: string, path: string) => {
        [key: string]: string;
    };
    getQueryData: (queryString?: string | undefined) => {
        [x: string]: string;
    };
    stripExtraTrailingSlash: (path: string) => string;
};
