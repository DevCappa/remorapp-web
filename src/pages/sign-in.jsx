import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import React, { useRef, useState } from "react";
import { SimpleFooter } from "@/widgets/layout";
import SweetAlert2 from 'react-sweetalert2';
import { PaperWallet } from "@thirdweb-dev/wallets";
import { Polygon } from "@thirdweb-dev/chains";
import CedalioSDK from "@cedalio/sdk-js"

export function SignIn() {
  const email = useRef(null);
  const [swalProps, setSwalProps] = useState({});
  const navigate = useNavigate();
  const cedalioSdk = new CedalioSDK({
    projectId: __APP_ENV__
  })
  const wallet = new PaperWallet({
    chain: Polygon, //  chain to connect to
    clientId: "15f1de3263bca42dcbcb640b0e7731f1", // client ID
  });
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  const sendData = async () => {
    const text = email.current.firstChild.value;
    if(text.length === 0){
      setSwalProps({
          icon: 'error',
          show: true,
          title: 'Ingresar Correo',
      });
     setTimeout(() => {setSwalProps({});},1500)
    }else{
      if(isValidEmail(text)){
        let data = await wallet.connect({
          email: text,
          chainId: 137
        });

        if(data.length != 0){
          window.localStorage.setItem("wallet", data)
          window.localStorage.setItem("email", text)
          navigate("/home")
        }else{
          setSwalProps({
            icon: 'error',
            show: true,
            title: 'Error al conectar el correo',
        });
        setTimeout(() => {setSwalProps({});},1500)
        }
      }else{
        setSwalProps({
          icon: 'error',
          show: true,
          title: 'Correo erroneo',
      });
      setTimeout(() => {setSwalProps({});},1500)
      }
    }
  }
  return (
    <>
      <img
        src="/img/background-2.jpg"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Login
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input ref={email} variant="standard" type="email" label="Correo" size="lg" />
            <div className="-ml-2.5">
              <Checkbox label="Recuerdame" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={sendData} fullWidth>
             Iniciar sesión
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Power By Cedalio & hive
            </Typography>
          </CardFooter>
        </Card>
      </div>
      <SweetAlert2 {...swalProps} />
    </>
  );
}

export default SignIn;
