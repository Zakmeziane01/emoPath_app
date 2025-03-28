import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "@/lib/global-provider";
import Loader from "@/components/Loader";

const AuthLayout = () => {
  const { loading, isLogged } = useGlobalContext(); 

  if (!loading && isLogged) return <Redirect href="/chatBox" />; 

  return (
    <>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false, 
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false, 
          }}
        />
      </Stack>

      <Loader isLoading={loading} /> 
      <StatusBar backgroundColor="#161622" style="light" /> 
    </>
  )
}

export default AuthLayout;
