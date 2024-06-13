import SecuredPage from "@/components/SecuredPage";
import Navbar from "@/components/navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SecuredPage>
      <>
        <Navbar />
        {children}{" "}
      </>
    </SecuredPage>
  );
}
