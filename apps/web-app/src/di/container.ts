import { Container } from "inversify";

/* MODULES */
import { MyModule } from "./my-provider/module";
import { EnvViteModule } from "./env/vite/module";
import { LogTapeModule } from "./logger/logtape/logtape.module";
import { HttpClientModule } from "./http/module";
import { ApiModule } from "./api/module";

export const createDiContainer = () => {
    const di: Container = new Container();

    di.load(MyModule);
    di.load(EnvViteModule);
    di.load(LogTapeModule);
    di.load(HttpClientModule);
    di.load(ApiModule);

    return di;
};
