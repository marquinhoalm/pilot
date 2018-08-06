/* eslint-disable */
import React, { Fragment }from 'react'
import {
  CardContent,
  CardActions,
  Row,
  Col,
  Grid,
  Button,
} from 'former-kit'
import styles from './style.css'

const ConfirmStep = () => (
  <Fragment>
  <CardContent>
    <p className={styles.title}>Confirmação de Cadastro</p>
    <p className={styles.subtitle}>Confira abaixo se os dados do seu recebedor estão corretos</p>
    <Grid>
      <Row>
        <Col>
        <span className={styles.title}>Dados do recebedor</span>
        </Col>
        <Col>
        <Button
          type="button"
          size="tiny"
          fill="outline"
        >
          Editar
        </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className={styles.infoTitle}>CNPJ</p>
          <span className={styles.info}>11.111.111/111-11</span>
        </Col>
        <Col>
          <p className={styles.infoTitle}>Nome da Empresa</p>
          <span className={styles.info}>Nome Fantasia</span>
        </Col>
        <Col>
          <p className={styles.infoTitle}>E-mail</p>
          <span className={styles.info}>nome@empresa.com.br</span>
        </Col>
      </Row>
      <Row>
      <Col>
          <p className={styles.infoTitle}>URL</p>
          <span className={styles.info}>www.empresa.com.br</span>
        </Col>
        <Col>
          <p className={styles.infoTitle}>Telefone</p>
          <span className={styles.info}>(11) 1111-1111</span>
        </Col>
      </Row>
      <Row>
        <Col>
        <span className={styles.title}>Dados dos Sócios</span>
        </Col>
        <Col>
        <Button
          type="button"
          size="tiny"
          fill="outline"
        >
          Editar
        </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className={styles.infoTitle}>CPF</p>
          <span className={styles.info}>111.111.111-11</span>
        </Col>
        <Col>
          <p className={styles.infoTitle}>Nome</p>
          <span className={styles.info}>Guilherme Melo Barroso</span>
        </Col>
        <Col>
          <p className={styles.infoTitle}>E-mail</p>
          <span className={styles.info}>guilherme@barroso.com.br</span>
        </Col>
      </Row>
      <Row>
        <Col>
        <span className={styles.title}>Conta Bancária</span>
        </Col>
        <Col>
        <Button
          type="button"
          size="tiny"
          fill="outline"
        >
          Editar
        </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className={styles.infoTitle}>Nome da conta</p>
          <span className={styles.info}>Conta Bancária 1</span>
        </Col>
        <Col>
          <p className={styles.infoTitle}>Banco</p>
          <span className={styles.info}>341 - Itaú Unibanco SA</span>
        </Col>
        <Col>
          <p className={styles.infoTitle}>Agência</p>
          <span className={styles.info}>0234</span>
        </Col>
        <Col>
          <p className={styles.infoTitle}>Conta</p>
          <span className={styles.info}>0006203-8</span>
        </Col>
        <Col>
          <p className={styles.infoTitle}>Tipo de Conta</p>
          <span className={styles.info}>Conta Corrent Individual</span>
        </Col>
      </Row>
      <Row>
        <Col>
        <span className={styles.title}>Configurações de Antecipação</span>
        </Col>
        <Col>
        <Button
          type="button"
          size="tiny"
          fill="outline"
        >
          Editar
        </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className={styles.infoTitle}>Modelo de Antecipação</p>
          <span className={styles.info}>Automática por volume</span>
        </Col>
        <Col>
          <p className={styles.infoTitle}>Volume antecipável(%)</p>
          <span className={styles.info}>100%</span>
        </Col>
      </Row>
      <Row>
        <Col>
        <span className={styles.title}>Configurações de Transferência</span>
        </Col>
        <Col>
        <Button
          type="button"
          size="tiny"
          fill="outline"
        >
          Editar
        </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className={styles.infoTitle}>Transferência automática</p>
          <span className={styles.info}>Habilitada</span>
        </Col>
        <Col>
          <p className={styles.infoTitle}>Intervalo de transferências automáticas</p>
          <span className={styles.info}>semanal</span>
        </Col>
        <Col>
          <p className={styles.infoTitle}>Dia de transferência</p>
          <span className={styles.info}>Segunda-feira</span>
        </Col>
      </Row>
    </Grid>
  </CardContent>
  <CardActions>
    <Button
      type="button"
      fill="outline"
    >
      Voltar
    </Button>
    <Button
      type="submit"
      fill="gradient"
    >
      Criar recebedor
    </Button>
  </CardActions>
  </Fragment>
)

export default ConfirmStep
