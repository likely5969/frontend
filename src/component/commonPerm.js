
 
export const checkPermission = async(location,navigate)=>{
 
    const url = new URL("http://localhost:8080/api/v2/auth/checkPerm");
    const accessToken = sessionStorage.getItem("accessToken");

    let pageUrl = location.pathname;
    pageUrl = "/"+pageUrl.split("/").filter(pageUrlSeg => isNaN(pageUrlSeg)).join("/");
    url.searchParams.append("pageUrl",pageUrl);

    const response =await fetch(url.toString(),{
        method:'GET',
        credentials: "include",
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${accessToken}`   

        },
     });
     if(response.ok){
        const data = await response.json();
        const memberId = data.data.memberId;
        const roleMenuPermissions = data.data.myMenuPerRoles;
        if(roleMenuPermissions == null){
            navigate("/login"); // navigate를 사용하여 로그인 페이지로 이동
          return ;

        }
        let highRoleMenuPerm =null;
        roleMenuPermissions.forEach(roleMenuPerm => {roleMenuPerm.rolePriorty
          if(highRoleMenuPerm == null || roleMenuPerm.rolePriorty > highRoleMenuPerm.rolePriorty){
            highRoleMenuPerm = roleMenuPerm;
          }
        });
        if(highRoleMenuPerm == null || highRoleMenuPerm.memberPermVal <=0){
            navigate("/login"); // navigate를 사용하여 로그인 페이지로 이동
            return ;
        }
        return (
            {   roleMenuPerm :  highRoleMenuPerm,
                memberId : memberId,
                menuApis: highRoleMenuPerm.menuApis || []
            }
        )
    }
};
export default checkPermission; // default export