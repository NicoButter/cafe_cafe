
package controller;

import java.io.IOException;
import java.sql.Date;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import dao.UsuarioDAO;
import modelo.Usuario;

@WebServlet("/registro")
public class RegistroServlet extends HttpServlet {
    //Se utiliza para asegurar la consistencia
    //en la serialización de la clase cuando se gestiona el estado de un servlet en un entorno distribuido.
    //private static final long serialVersionUID = 1L;
    
//    HttpServletRequest request:
//    Es un objeto que encapsula toda la información de la solicitud HTTP enviada por el cliente.
//    
//    HttpServletResponse response:
//    Es un objeto que permite al servlet construir y enviar la respuesta HTTP al cliente.
    
//    Estos objetos son pasados automáticamente por el contenedor de servlets
//    a los métodos doGet(), doPost() cuando se realiza una solicitud al servlet.
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Obtener parámetros de la solicitud
        String nombre = request.getParameter("nombre");
        String apellido = request.getParameter("apellido");
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        String fechaNacimiento = request.getParameter("fechaNacimiento");
        String pais = request.getParameter("pais");

        Usuario usuario = new Usuario();
        usuario.setNombre(nombre);
        usuario.setApellido(apellido);
        usuario.setEmail(email);
        usuario.setPassword(password);
        //convierte una cadena de texto a un objeto Date
        //proviene del paquete java.sql
        usuario.setFechaNacimiento(Date.valueOf(fechaNacimiento));
        usuario.setPais(pais);

        UsuarioDAO usuarioDAO = new UsuarioDAO();
        boolean registroExitoso = usuarioDAO.insertarUsuario(usuario);

        if (registroExitoso) {
            response.sendRedirect("pages/registrarse.html?exito=true");
        } else {
            response.sendRedirect("pages/registrarse.html?error=true");
        }
    }
}
