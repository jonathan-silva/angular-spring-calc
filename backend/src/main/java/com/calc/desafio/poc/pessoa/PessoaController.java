package com.calc.desafio.poc.pessoa;

import io.swagger.annotations.ApiOperation;
import jdk.jfr.Description;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = "/pessoa")
public class PessoaController {

    @Autowired
    private PessoaService pessoaService;

    @Description(PessoaConstant.GET_LIST_ALL)
    @ApiOperation(PessoaConstant.GET_LIST_ALL)
    @GetMapping(value = "")
    public List<Pessoa> getAllPessoa() {
        return this.pessoaService.getAllPessoas();
    }

    @Description(PessoaConstant.GET_PESSOA)
    @ApiOperation(PessoaConstant.GET_LIST_ALL)
    @GetMapping(value = "/{id}")
    public Optional<Pessoa> getPessoa(@PathVariable(name = "id") String id) {
        return this.pessoaService.getPessoa(id);
    }

    @Description(PessoaConstant.POST_PESSOA)
    @ApiOperation(PessoaConstant.GET_LIST_ALL)
    @PostMapping(value = "/create")
    public Pessoa createPessoa(@RequestBody Pessoa pessoa) {
        Pessoa createPessoa = this.pessoaService.createPessoa(pessoa);
        return createPessoa;
    }

    @Description(PessoaConstant.PUT_PESSOA)
    @ApiOperation(PessoaConstant.GET_LIST_ALL)
    @PutMapping("/update/{id}")
    public Pessoa updatePessoa(@RequestBody Pessoa pessoa, @PathVariable("id") String id) {
        pessoa.setId(id);
        Pessoa updatePessoa = this.pessoaService.updatePessoa(pessoa);
        return updatePessoa;
    }

    @Description(PessoaConstant.DELETE_PESSOA)
    @ApiOperation(PessoaConstant.GET_LIST_ALL)
    @DeleteMapping("/drop/{id}")
    public void deletePessoa(@PathVariable("id") String id) {
        this.pessoaService.deletePessoa(id);
    }
}
