import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import * as AuthService from "../store/services/authService";
import * as NameService from "../store/services/nameService";
import {
  Button,
  Card,
  Container,
  Dimmer,
  Form,
  Header,
  Icon,
  Input,
  Label,
  Loader,
  Menu,
  Modal,
  Pagination,
  Segment,
  Table,
} from "semantic-ui-react";
import styles from "../styles/index.module.css";

const mapStateToProps = (state) => {
  return { user: state.user, names: state.data.names };
};

const Profile = ({ dispatch, user, names }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, setFormState] = useState({});
  const [error, setError] = useState();
  const [secondOpen, setSecondOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editName, setEditName] = useState({});

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // if state is deleted from store then logout
        if (!user.token) {
          await dispatch(AuthService.logout());
          router.push("/sign-in");
        } else {
          await dispatch(AuthService.authCheck());
          await dispatch(NameService.getNames());
          console.log("auth check: success");
        }
      } catch (err) {
        setError(err.error);
        setIsModalOpen(true);
      }
    };
    checkAuth();
  }, []);

  const fixed = false;

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const handleEditChange = (event) => {
    setEditName({ ...editName, [event.target.name]: event.target.value });
  };

  const handleClose = () => {
    setFormState({});
    setOpen(false);
  };

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

  const handleCloseModal = () => {
    router.push("/sign-in");
  };

  const handleEdit = (key) => {
    console.log(key);
    setEditName(...names.filter((name) => name.id == key));
    setEditModalOpen(true);
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    await dispatch(NameService.editName(editName));
    setEditModalOpen(false);
  };

  const handleDelete = (key) => {
    console.log(key);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      {names == null ? (
        <Dimmer active inverted>
          <Loader size="large">Loading</Loader>
        </Dimmer>
      ) : (
        <div className={styles.profile}>
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
          <Container className={styles.tablecontainer}>
            <Card fluid={true} raised={true}>
              <Table inverted padded>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>
                      <Header size="medium" inverted={true}>
                        Actions
                      </Header>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <Header size="medium" inverted={true}>
                        First Name
                      </Header>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <Header size="medium" inverted={true}>
                        Middle Name
                      </Header>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <Header size="medium" inverted={true}>
                        Last Name
                      </Header>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                {names.length === 0 ? (
                  <Table.Body>
                    <Table.HeaderCell colSpan="4">
                      Now rows to display
                    </Table.HeaderCell>
                  </Table.Body>
                ) : (
                  <>
                    <Table.Body>
                      {names.map((name) => (
                        <Table.Row key={name.id}>
                          <Table.Cell>
                            <Button
                              inverted={true}
                              color="orange"
                              icon="edit"
                              onClick={() => handleEdit(name.id)}
                            />
                            <Button
                              inverted={true}
                              color="orange"
                              icon="delete"
                              onClick={() => handleDelete(name.id)}
                            />
                          </Table.Cell>
                          <Table.Cell>{name.firstName}</Table.Cell>
                          <Table.Cell>{name.middleName}</Table.Cell>
                          <Table.Cell>{name.lastName}</Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>

                    <Table.Footer fullWidth>
                      <Table.Row>
                        <Table.HeaderCell colSpan="4">
                          <Pagination
                            defaultActivePage={1}
                            firstItem={null}
                            lastItem={null}
                            pointing
                            secondary
                            inverted={true}
                            totalPages={10}
                          />

                          <Modal
                            open={open}
                            trigger={
                              <Button
                                floated="right"
                                icon
                                labelPosition="left"
                                color="orange"
                                size="small"
                              >
                                <Icon name="user" /> Add Name
                              </Button>
                            }
                            onClose={handleClose}
                            onOpen={() => setOpen(true)}
                          >
                            <Header icon="user" content="Add new name" />
                            <Modal.Content>
                              <Form onSubmit={handleSubmit}>
                                <Form.Field>
                                  <Label basic={true}>First Name</Label>
                                  <Input
                                    name="firstName"
                                    placeholder="Enter first name"
                                    value={formState.firstName || ""}
                                    onChange={handleChange}
                                  />
                                </Form.Field>
                                <Form.Field>
                                  <Label basic={true}>Middle Name</Label>
                                  <Input
                                    name="middleName"
                                    placeholder="Enter middle name"
                                    value={formState.middleName || ""}
                                    onChange={handleChange}
                                  />
                                </Form.Field>
                                <Form.Field>
                                  <Label basic={true}>Last Name</Label>
                                  <Input
                                    name="lastName"
                                    placeholder="Enter last name"
                                    value={formState.lastName || ""}
                                    onChange={handleChange}
                                  />
                                </Form.Field>
                              </Form>
                            </Modal.Content>
                            <Modal.Actions>
                              <Button color="red" onClick={handleClose}>
                                <Icon name="remove" /> Cancel
                              </Button>
                              <Button
                                color="green"
                                onClick={() => setSecondOpen(true)}
                              >
                                <Icon name="checkmark" /> Confirm
                              </Button>
                            </Modal.Actions>
                          </Modal>
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Footer>
                  </>
                )}
              </Table>
            </Card>
          </Container>

          <Modal
            onClose={() => setSecondOpen(false)}
            open={secondOpen}
            size="small"
          >
            <Modal.Content>
              <p>That's everything!</p>
            </Modal.Content>
            <Modal.Actions>
              <Button
                icon="check"
                content="All Done"
                onClick={() => setSecondOpen(false)}
              />
            </Modal.Actions>
          </Modal>

          <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
            <Header icon="user" content="Edit name" />
            <Modal.Content>
              <Form onSubmit={handleEditSubmit} id="editform">
                <Form.Field>
                  <Label basic={true}>First Name</Label>
                  <Input
                    name="firstName"
                    placeholder="Enter first name"
                    value={editName.firstName}
                    onChange={handleEditChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Label basic={true}>Middle Name</Label>
                  <Input
                    name="middleName"
                    placeholder="Enter middle name"
                    value={editName.middleName}
                    onChange={handleEditChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Label basic={true}>Last Name</Label>
                  <Input
                    name="lastName"
                    placeholder="Enter last name"
                    value={editName.lastName}
                    onChange={handleEditChange}
                  />
                </Form.Field>
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button color="red" onClick={handleClose}>
                <Icon name="remove" /> Cancel
              </Button>
              <Button type="submit" form="editform" color="green">
                <Icon name="checkmark" /> Confirm
              </Button>
            </Modal.Actions>
          </Modal>

          <Modal size="mini" open={isModalOpen}>
            <Modal.Header></Modal.Header>
            <Modal.Content>
              <p>{error}. Please sign-in again.</p>
            </Modal.Content>
            <Modal.Actions>
              <Button color="orange" onClick={handleCloseModal}>
                Okay
              </Button>
            </Modal.Actions>
          </Modal>
        </div>
      )}
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
