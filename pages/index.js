import React from "react";
import Head from "next/head";
import Link from "next/link";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { Button, Container, Menu, Segment } from "semantic-ui-react";
import styles from "../styles/index.module.css";

// const mapStateToProps = (state) => {
//   console.log(state);
// };

const Home = () => {
  const router = useRouter();
  const fixed = false;

  const handleSignIn = () => {
    router.push("/sign-in");
  };

  const handleSignUp = () => {
    router.push("/sign-up");
  };

  return (
    <>
      <Head>
        <title>Home</title>
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
            <Menu.Item active>
              <Link href="/">Home</Link>
            </Menu.Item>
            <Menu.Item>
              <Link href="/profile">Profile</Link>
            </Menu.Item>
            <Menu.Item position="right">
              <Button
                className={styles.marginleft}
                inverted={!fixed}
                onClick={handleSignIn}
              >
                Sign In
              </Button>
              <Button
                className={styles.marginleft}
                inverted={!fixed}
                primary={fixed}
                onClick={handleSignUp}
              >
                Sign Up
              </Button>
            </Menu.Item>
          </Container>
        </Menu>
      </Segment>
    </>
  );
};

export default connect(null, null)(Home);
