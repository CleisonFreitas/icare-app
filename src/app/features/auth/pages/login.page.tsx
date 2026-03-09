import { CardLogin } from "../components/card.login";
import { FormLogin } from "../components/form.login";

const LoginPage = () => {
    return (
        <section className="flex justify-center items-center w-[100vw] h-[100vh] bg-slate-100 p-4">
            <div className="h-full w-full md:h-[700px] md:w-[600px]">
                <CardLogin>
                    <FormLogin />
                </CardLogin>
            </div>
        </section>
    )
}

export default LoginPage;