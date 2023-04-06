export function add_type(type_name,type_code) {
    var old1 = localStorage.getItem("control_extention")
    localStorage.setItem("control_extention",old1 + "," + type_name)
    localStorage.setItem(type_name,type_code)
}

export function get_type() {
    return localStorage.getItem("control_extention")
}