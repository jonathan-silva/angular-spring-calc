package com.calc.desafio.poc.pessoa;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.lang.invoke.MethodHandles;
import java.util.List;
import java.util.Optional;

@Service
public class PessoaService {

    private static final Logger LOGGER = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

    @Autowired
    PessoaRepository pessoaRepository;

    public List<Pessoa> getAllPessoas() {
        LOGGER.info("Buscando Lista de Pessoa...");
        return this.pessoaRepository.findAll();
    }

    public Optional<Pessoa> getPessoa(String id) {
        LOGGER.info("Buscando Pessoa pelo ID => " + id);
        return this.pessoaRepository.findById(id);
    }

    public Pessoa createPessoa(Pessoa pessoa) {
        LOGGER.info("Criando a Pessoa...");
        if(pessoa.getNm_pessoa() == null) {
            throw new IllegalArgumentException("Objeto é não é valido.");
        } else {
            Pessoa createPessoa = this.pessoaRepository.insert(pessoa);
            LOGGER.info("Pessoa " + createPessoa.getNm_pessoa() + " Criado com Sucesso.");
            return createPessoa;
        }
    }

    public Pessoa updatePessoa(Pessoa pessoa) {
        Pessoa updatePessoa = this.pessoaRepository.save(pessoa);
        return updatePessoa;
    }

    public ResponseEntity deletePessoa(String id) {
        LOGGER.info("Procurando Pessoa...");
        return this.pessoaRepository.findById(id).map(entity -> {
            this.pessoaRepository.delete(entity);
            LOGGER.info("Deletado pessoa com id " + entity.getId() + " nome => " + entity.getNm_pessoa());
            return entity;
        }).map(t -> ResponseEntity.noContent().build())
                .orElse(ResponseEntity.notFound().build());
    }
}
