import express , {Express} from "express"
import dotenv from "dotenv"
import moment from "moment"
import bodyParser from "body-parser";
import clientRoutes from "./routes/client/index.route";

dotenv.config();

const app:Express = express();
const port: number | string = process.env.PORT || 3000;

app.use(bodyParser.json());

app.set("views","./views");
app.set("view engine","pug");
app.use(express.static(`${__dirname}/public`));

// App Local variable
app.locals.moment = moment;

//Client Routes
clientRoutes(app);

app.listen(port,()=>{
    console.log(`App listening on port ${port}`)
})