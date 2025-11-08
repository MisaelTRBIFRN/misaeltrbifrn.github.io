package br.com.criandoapi.projeto.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

//@Data
@Getter
@Setter

@Entity
@Table(name = "usuario")
public class Usuario {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;

    //@NotEmpty // nao nulo, mas se for varios caractere vazio, permite
    //@NotNull // nao nulo, mas string vazia permitido

    @NotBlank(message = "O nome é obrigatório!") // completo
	@Size(min = 3, message = "O nome deve ter no mínimo 3 caracteres")
    @Column(name = "nome", length = 200, nullable = false)
	private String nome;

    @Email(message = "Insira um email válido!")
    @NotBlank(message = "O email é obrigatório!")
	@Column(name = "email", length = 50, nullable = false)
	private String email;

    @NotBlank(message = "A senha é obrigatória!")
	@Column(name = "senha", columnDefinition = "TEXT", nullable = false)
	private String senha;

    @NotBlank(message = "O telefone é obrigatório!")
	@Column(name = "telefone", length = 15, nullable = false)
	private String telefone;
}
