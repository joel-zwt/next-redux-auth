import React, { useState } from "react";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import {
  Button,
  Card,
  Form,
  Grid,
  Header,
  Icon,
  Input,
  Label,
  Message,
  Modal,
} from "semantic-ui-react";
import styles from "../styles/index.module.css";

const mapStateToProps = (state) => ({
  token: state.counter.token,
});

const SignUpForm = ({ token }) => {
  const router = useRouter();
  const [formState, setFormState] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log(formState);
      let response = await axios({
        method: "post",
        url: "/signup",
        data: {
          email: formState.email,
          password: formState.password,
        },
      });
      console.log(response.status);
      console.log(response.data);
      if (response.status === 200) {
        router.push("/profile");
      }
    } catch {
      // catch http response errors such as 401,500
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Head>
        <title>Sign up</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Grid className={styles.grid}>
        <Head>
          <title>Sig Up</title>
          <link rel="icon" href="/logo.png" />
        </Head>
        <Grid.Column className={styles.main}>
          <Header as="h2" inverted={true} className={styles.heading}>
            <Icon name="sign in" />
            <Header.Content>Create a new account</Header.Content>
          </Header>
          <Card fluid color="orange" raised={true}>
            <Form
              size="large"
              onSubmit={handleSubmit}
              className={styles.card_form}
            >
              <Form.Field>
                <Label basic={true}>Email Address</Label>
                <Input
                  name="email"
                  icon="mail"
                  iconPosition="left"
                  placeholder="Enter email address"
                  value={formState.email || ""}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Label basic={true}>Password</Label>
                <Input
                  inverted={true}
                  name="password"
                  icon="key"
                  iconPosition="left"
                  placeholder="Enter email address"
                  type="password"
                  value={formState.password || ""}
                  onChange={handleChange}
                />
              </Form.Field>
              <Button inverted color="orange">
                Sign Up
              </Button>
            </Form>
          </Card>
          <Message>
            Already a member? <Link href="/sign_in">Sign In</Link>
          </Message>
        </Grid.Column>
      </Grid>
      <Modal size="mini" open={isModalOpen}>
        <Modal.Header></Modal.Header>
        <Modal.Content>
          <p>Internal server error. Please try again.</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="orange" onClick={closeModal}>
            Okay
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default connect(mapStateToProps)(SignUpForm);
