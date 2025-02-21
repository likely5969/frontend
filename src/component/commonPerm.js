export default checkPermission = async()=>{
    const url = new URL("http://localhost:8080/api/v2/auth/checkPerm");
    const location = useLocation();  // 현재 경로 가져오기
    const accessToken = sessionStorage.getItem("accessToken");

    const pageUrl = location.pathname;
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
          location.href="/login";
        }
        let highRoleMenuPerm =null;
        roleMenuPermissions.forEach(roleMenuPerm => {roleMenuPerm.rolePriorty
          if(highRoleMenuPerm == null || roleMenuPerm.rolePriorty > highRoleMenuPerm.rolePriorty){
            highRoleMenuPerm = roleMenuPerm;
          }
        });
        if(highRoleMenuPerm == null || highRoleMenuPerm.memberPermVal <=0){
            location.href="/login";
        }
        return (
            {   roleMenuPerm :  highRoleMenuPerm,
                memberId : memberId,
                menuApis: highRoleMenuPerm.menuApis || []
            }
        )
    }
};
