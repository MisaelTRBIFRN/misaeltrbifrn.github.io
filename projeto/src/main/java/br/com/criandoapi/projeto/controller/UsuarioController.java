package br.com.criandoapi.projeto.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import br.com.criandoapi.projeto.dto.UsuarioDto;
import br.com.criandoapi.projeto.security.Token;
import br.com.criandoapi.projeto.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import br.com.criandoapi.projeto.repository.IUsuario;
import br.com.criandoapi.projeto.model.Usuario;

@RestController
@CrossOrigin("*")
@RequestMapping("/usuarios")
public class UsuarioController {

    private UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> listaUsuarios() {
        //List<Usuario> lista = dao.findAll(); // com CRUD isso aqui dá erro. Com CRUD precisa "(List<Usuario>)"

        return ResponseEntity.status(200).body(usuarioService.listarUsuario());
    }

    @PostMapping
    public ResponseEntity<Usuario> criarUsuario(@Valid @RequestBody Usuario usuario) {
        return ResponseEntity.status(201).body(usuarioService.criarUsuario(usuario));
    }

    @PutMapping
    public ResponseEntity<Usuario> editarUsuario(@Valid @RequestBody Usuario usuario) {
        return ResponseEntity.status(200).body(usuarioService.editarUsuario(usuario));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluirUsuario(@PathVariable Integer id) {
        boolean excluido = usuarioService.excluirUsuario(id);

        if (excluido) {
            return ResponseEntity.status(204).build();
        } else {
            return ResponseEntity.status(404).body("Usuário com ID " + id + " não encontrado.");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Token> logar(@Valid @RequestBody UsuarioDto usuario) {
        Token token = usuarioService.gerarToken(usuario);

        if (token != null) {
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(403).build();
        }
    }

    @PostMapping("/loginAdmin")
    public ResponseEntity<Token> logarAdmin(@Valid @RequestBody UsuarioDto usuario) {
        Token token = usuarioService.gerarToken(usuario);

        if (token != null) {
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(403).build();
        }
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationException(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getAllErrors().forEach((error) -> {
           String fieldName = ((FieldError) error).getField();
           String errorMessage = error.getDefaultMessage();

           errors.put(fieldName, errorMessage);
        });

        return errors;
    }
}