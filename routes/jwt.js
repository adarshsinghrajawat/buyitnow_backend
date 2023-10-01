var { expressjwt: jwt } = require("express-jwt");
const { config } = require("./pool");

function jwts() {
    const { secret } = config;
    return jwt({ secret: "shhhh", algorithms: ["RS256", "HS256"] }).unless({
        path: [
            "/company/chk_company_login",
            "/userinterface/*",
            "/banner/fetch_banner_images"
        ],
    });
}
module.exports = jwts;