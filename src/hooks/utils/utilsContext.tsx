// import React, { useState } from 'react';
// import AuthService from '../../services/Auth/auth.service';
// import { useAuth } from '../auth/useAuth';
// import { UtilsContext } from './useUtils';



// type UtilsProviderProps = {
//   children: React.JSX.Element
// }

// const UtilsProvider = ({ children }: UtilsProviderProps) => {

//   const { user } = useAuth();
//   const [isFetching, _setIsFetching] = useState<boolean>(false);

//   const userRolesResponse = AuthService.useGetUserRoles({
//     enabled: user ? true : false,
//   });

//   const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(JSON.parse(sessionStorage.getItem("sidebarOpen") || "true"));
//   const handleIsSidebarOpen = (flag: boolean) => {
//     sessionStorage.setItem("sidebarOpen", JSON.stringify(flag));
//     setIsSidebarOpen(flag);
//   }



//   return (
//     <UtilsContext.Provider value={{
//       isFetching: isFetching || userRolesResponse.isLoading,
//       isSidebarOpen: isSidebarOpen,
//       setIsSidebarOpen: handleIsSidebarOpen,
//       userRoles: userRolesResponse.data?.data || []
//     }}>
//       {children}
//     </UtilsContext.Provider>
//   )
// }

// export default UtilsProvider