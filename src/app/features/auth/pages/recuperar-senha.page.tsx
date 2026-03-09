import { CardRecuperarSenha } from "../components/card.recuperar-senha";
import { FormRecuperarSenha } from "../components/form.recuperar-senha";

const RecuperarSenhaPage = () => {
    return (
        <section className="flex justify-center items-center w-[100vw] h-[100vh] bg-slate-100 p-4">
            <div className="h-full w-full md:h-[700px] md:w-[600px]">
                <CardRecuperarSenha>
                    <FormRecuperarSenha />
                </CardRecuperarSenha>
            </div>
        </section>
    )
}

export default RecuperarSenhaPage;