const AuthLayout = ({
    children
  }: {
    children: React.ReactNode;
  }) => {
    return ( 
        <div className="flex justify-center items-center h-screen">
        <div className="m-4 sm:m-8 md:m-16 lg:m-32 w-full">
          {children}
        </div>
      </div>
      
     );
  }
   
  export default AuthLayout;