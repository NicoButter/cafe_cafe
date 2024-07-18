package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import conexion.ConexionDB;
import modelo.Usuario;

public class UsuarioDAO {

    
	public boolean insertarUsuario(Usuario usuario) {
	    String sql = "INSERT INTO usuario (nombre, apellido, email, password, fecha_nacimiento, pais) VALUES (?, ?, ?, ?, ?, ?)";

	    try (Connection conn = ConexionDB.obtenerConexion();
	         PreparedStatement pstmt = conn.prepareStatement(sql)) {

	        pstmt.setString(1, usuario.getNombre());
	        pstmt.setString(2, usuario.getApellido());
	        pstmt.setString(3, usuario.getEmail());
	        pstmt.setString(4, usuario.getPassword());

	        java.util.Date fechaUtil = usuario.getFechaNacimiento();
	        if (fechaUtil != null) {
	            java.sql.Date fechaSql = new java.sql.Date(fechaUtil.getTime());
	            pstmt.setDate(5, fechaSql);
	        } else {
	            pstmt.setNull(5, java.sql.Types.DATE);
	        }
	        
	        pstmt.setString(6, usuario.getPais());

	        int filasAfectadas = pstmt.executeUpdate();
	        return filasAfectadas > 0;
	    } catch (SQLException e) {
	        e.printStackTrace();
	        return false;
	    }
	}

    private Usuario extraerUsuarioDeResultSet(ResultSet rs) throws Exception {
        Usuario usuario = new Usuario();
        usuario.setId(rs.getInt("id"));
        usuario.setNombre(rs.getString("nombre"));
        usuario.setApellido(rs.getString("apellido"));
        usuario.setEmail(rs.getString("email"));
        usuario.setPassword(rs.getString("password"));
        usuario.setFechaNacimiento(rs.getDate("fecha_nacimiento"));
        usuario.setPais(rs.getString("pais"));
        return usuario;
    }

    public List<Usuario> obtenerTodos() {
        
        List<Usuario> usuarios = new ArrayList<>();
        String query = "SELECT * FROM usuario";
        
        try (Connection conn = ConexionDB.obtenerConexion();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(query)) {
            
            while (rs.next()) {
                Usuario usuario = extraerUsuarioDeResultSet(rs);
                usuarios.add(usuario);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return usuarios;
    }

    public Usuario obtenerPorId(int id) {
        String query = "SELECT * FROM usuario WHERE id = ?";
        try (Connection conn = ConexionDB.obtenerConexion();
             PreparedStatement pstmt = conn.prepareStatement(query)) {
            
            pstmt.setInt(1, id);
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    return extraerUsuarioDeResultSet(rs);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public boolean modificar(Usuario usuario) {
        String query = "UPDATE usuario SET nombre = ?, apellido = ?, email = ?, password = ?, fecha_nacimiento = ?, pais = ? WHERE id = ?";
        try (Connection conn = ConexionDB.obtenerConexion();
             PreparedStatement pstmt = conn.prepareStatement(query)) {
            
            pstmt.setString(1, usuario.getNombre());
            pstmt.setString(2, usuario.getApellido());
            pstmt.setString(3, usuario.getEmail());
            pstmt.setString(4, usuario.getPassword());
            pstmt.setDate(5, usuario.getFechaNacimiento());
            pstmt.setString(6, usuario.getPais());
            pstmt.setInt(7, usuario.getId());
            
            int filasAfectadas = pstmt.executeUpdate();
            return filasAfectadas > 0;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean eliminar(int id) {
        String query = "DELETE FROM usuario WHERE id = ?";
        try (Connection conn = ConexionDB.obtenerConexion();
             PreparedStatement pstmt = conn.prepareStatement(query)) {
            
            pstmt.setInt(1, id);
            int filasAfectadas = pstmt.executeUpdate();
            return filasAfectadas > 0;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

}