import { useRef, useState } from "react";
import { ButtonLoading } from "../../../shared/components/button.loading";
import { CustomInput } from "../../../shared/components/custom.input";
import { useLocation, useNavigate } from "react-router-dom";
import type { ValidarPinType } from "../types/auth.validar-pin.type";
import { useAuth } from "../hooks/use.auth.hook";
import type { RecuperarSenhaType } from "../types/auth.recuperar-senha.type";

const PIN_LENGTH = 4;

export const FormCodigoPin = () => {
  const [pin, setPin] = useState<string[]>(Array(PIN_LENGTH).fill(""));
  const { mutationValidarPin, mutationRecuperarSenha } = useAuth();

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const { state } = useLocation();

  const [codigoReenviado, setCodigoReenviado] = useState<boolean>(false);

  const navigate = useNavigate();

  const isFormValid = pin.every((digit) => digit !== "");

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value && index < PIN_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newPin.every((digit) => digit !== "")) {
      handleSubmit(newPin.join(""));
    }
  };

  const handleReenviarCodigo = () => {
    const data: RecuperarSenhaType = {
      email: state.email
    }
    mutationRecuperarSenha.mutate(data, {
      onSuccess: () => {
        setCodigoReenviado(true);

        setTimeout(() => {
          setCodigoReenviado(false);
        }, 3000);
      }
    })
  }

  const handleSubmit = (codigo: string) => {

    const payload: ValidarPinType = {
      email: state.email,
      pin: codigo,
    };

    mutationValidarPin.mutate(payload, {
      onSuccess: () => {
        navigate("/codigo-confirmado", { replace: true, state: { email: state.email } });
      }
    })
  };

  return (
    <form
      className="flex flex-col gap-12 w-full h-full items-center"
      onSubmit={(e) => {
        e.preventDefault();
        if (isFormValid) handleSubmit(pin.join(""));
      }}
    >
      <div className="flex flex-col gap-4">
        <div className="grid gap-4 grid-cols-4">
          {pin.map((digit, index) => (
            <CustomInput
              key={index}
              value={digit}
              placeholder="0"
              textPosition="center"
              maxLength={1}
              onChange={(e) => handleChange(index, e.target.value)}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
            />
          ))}
        </div>
        <button
          className={`self-end ${codigoReenviado ? 'text-gray-500' : 'text-blue-600'} `}
          onClick={() => handleReenviarCodigo()}
          disabled={codigoReenviado}

        >{codigoReenviado ? "Reenviando..." : "Reenviar código"}
        </button>
      </div>

      <ButtonLoading isLoading={mutationValidarPin.isPending} disabled={!isFormValid}>
        Enviar
      </ButtonLoading>
    </form>
  );
};