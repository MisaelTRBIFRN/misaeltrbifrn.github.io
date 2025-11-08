package br.com.criandoapi.projeto.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.criandoapi.projeto.model.Usuario;

import java.util.Optional;

public interface IUsuario extends JpaRepository<Usuario, Integer> {

    Optional<Usuario> findByEmail(String email);
}
