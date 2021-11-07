import { serverHtpp } from "./http";
import './websocket';

serverHtpp.listen(3000, () => console.log('Running'))