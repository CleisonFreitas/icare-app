import { CardCodigoPinValidado } from "../components/card.codigo-pin-validado";

const CodigoConfirmadoPage = () => {
    return (
        <section className="flex justify-center items-center w-[100vw] h-[100vh] bg-slate-100 p-4">
            <div className="h-full w-full md:h-[500px] md:w-[400px]">
                <CardCodigoPinValidado />
            </div>
        </section>
    );
}

export default CodigoConfirmadoPage