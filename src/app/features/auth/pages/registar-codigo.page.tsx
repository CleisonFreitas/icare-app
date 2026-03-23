import { CardCodigoPin } from "../components/card.codigo-pin"
import { FormCodigoPin } from "../components/form.codigo-pin"

const RegistrarCodigoPage = () => {
    return (
        <section className="flex justify-center items-center w-[100vw] h-[100vh] bg-slate-100 p-4">
            <div className="h-full w-full md:h-[500px] md:w-[400px]">
                <CardCodigoPin>
                    <FormCodigoPin />
                </CardCodigoPin>
            </div>
        </section>
    );
}

export default RegistrarCodigoPage