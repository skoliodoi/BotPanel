import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../ui/Button";
import InputField from "../ui/InputField";
import Loader from "../ui/Loader";
import Dropdown from "../ui/Dropdown";
import { useLanguageData } from "../contexts/LanguageContext";
import config from "../helpers/siteConfig";

function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated, error, loggingIn, forwardPath } = useAuth();
  const { t } = useLanguageData();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const { section } = useParams();
  const sections = config.sections;
  async function handleSubmit(e) {
    e.preventDefault();
    if (user && password) {
      login(user, password);
    }
  }

  useEffect(
    function () {
      document.title = `Primebot Panel`;
      if (!sections.includes(section)) {
        navigate("/");
        return;
      }
      if (isAuthenticated) {
        navigate(forwardPath);
      }
    },
    [isAuthenticated, navigate, forwardPath, section, sections],
  );

  if (loggingIn) return <Loader loaderText={"loggingIn"} />;

  return (
    <>
      <div className="absolute right-10 top-3">
        <Dropdown />
      </div>
      <main className="flex h-screen flex-col items-center justify-center gap-10 bg-sky-100">
        <div className="flex w-1/2 items-center justify-start">
          <img src="/images/prime.png" alt="PRIME" />
        </div>
        <div className="flex w-1/4 justify-center">
          <form onSubmit={handleSubmit} className="flex w-3/4 flex-col gap-3">
            <div className="flex flex-col">
              {/* <label className="text-xl font-bold text-primebot-blue">
              Login
              </label>
              <input
              value={user}
              onChange={(e) => setUser(e.target.value)}
              type="text"
            /> */}
              <InputField label={"Login"} value={user} onChange={setUser} />
            </div>
            <div className="flex flex-col">
              <InputField
                label={"pass"}
                value={password}
                type="password"
                onChange={setPassword}
              />
              {/* <label className="text-xl font-bold text-primebot-grey">
              Hasło
              </label>
              <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            /> */}
            </div>
            <div className="text-red-500">{error}</div>
            <div className="text-center">
              <Button type="login">{t("login")}</Button>
            </div>
          </form>
        </div>
        <div className="ml-36 flex w-1/4 items-center justify-end">
          <img src="/images/BOT.png" alt="Text saying BOT" />
        </div>
      </main>
    </>
  );
}

export default Login;
