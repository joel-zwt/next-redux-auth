import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import * as AuthService from "../store/services/authService";
import { Button, Container, Menu, Modal, Segment } from "semantic-ui-react";
import styles from "../styles/index.module.css";

const mapStateToProps = (state) => {
  return { user: state.user };
};

const Profile = ({ dispatch, user }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await dispatch(AuthService.authCheck());
        console.log("auth check: success");
      } catch (err) {
        setError(err.error);
        setIsModalOpen(true);
      }
    };
    checkAuth();
  }, []);
  // console.log(error, open);
  const fixed = false;
  const handleSignIn = () => {
    router.push("/sign-in");
  };

  const handleLogout = async () => {
    try {
      await dispatch(AuthService.logout());
      router.push("/sign-in");
    } catch (err) {
      router.push("/sign-in");
    }
  };

  const closeModal = () => {
    router.push("/sign-in");
  };

  return (
    <>
      <Head>
        <title>Profile</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <Segment inverted textAlign="center" vertical>
        <Menu
          fixed={fixed ? "top" : null}
          inverted={!fixed}
          // pointing={!fixed}
          secondary={!fixed}
          size="large"
        >
          <Container>
            <Menu.Item>
              <Link href="/">Home</Link>
            </Menu.Item>
            <Menu.Item active>
              <Link href="/profile">Profile</Link>
            </Menu.Item>
            <Menu.Item position="right">
              <Button
                className={styles.marginleft}
                inverted={!fixed}
                active={true}
                onClick={handleSignIn}
              >
                Hello, {user.email}
              </Button>
              <Button
                className={styles.marginleft}
                inverted={!fixed}
                primary={fixed}
                compact={true}
                onClick={handleLogout}
                icon="sign out"
              />
            </Menu.Item>
          </Container>
        </Menu>
      </Segment>
      <Modal size="mini" open={isModalOpen}>
        <Modal.Header></Modal.Header>
        <Modal.Content>
          <p>{error}. Please sign-in again.</p>
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

// Profile.getInitialProps = async ({ store }) => {
//   try {
//     await store.dispatch(AuthService.authCheck());
//     console.log("auth check: success");
//     return { error: null, open: false };
//   } catch (err) {
//     console.log("asd");
//     console.log(err.stack);
//     // setError(err.error);
//     // setIsModalOpen(true);
//     return { error: err.error, open: true };
//   }
// };

export default connect(mapStateToProps, null)(Profile);
