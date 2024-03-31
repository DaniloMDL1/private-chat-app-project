const SidebarHeader = () => {
    return (
        <div className="p-2">
            <div className="flex items-center gap-3">
                <img src="https://imgsrv.crunchyroll.com/cdn-cgi/image/format=auto,width=1200,height=675,fit=contain,quality=85/catalog/crunchyroll/a249096c7812deb8c3c2c907173f3774.jpe" className="w-12 h-12 rounded-full ring-1 ring-white"/>
                <div className="text-white truncate">Username</div>
            </div>
        </div>
    )
}

export default SidebarHeader