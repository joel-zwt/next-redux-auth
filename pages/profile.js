import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import * as AuthService from "../store/services/authService";
import * as NameService from "../store/services/nameService";
import * as actions from "../store/actions/profile";
import {
  Button,
  Card,
  Container,
  Dimmer,
  Dropdown,
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
  return {
    addModalOpen: state.profile.addModalOpen,
    authModalOpen: state.profile.authModalOpen,
    editModalOpen: state.profile.editModalOpen,
    names: state.data.names,
    page: state.data.page,
    rowsPerPage: state.data.rowsPerPage,
    secondModalOpen: state.profile.secondModalOpen,
    totalEntries: state.data.totalEntries,
    totalPages: state.data.totalPages,
    user: state.user,
  };
};

const Profile = ({
  addModalOpen,
  authModalOpen,
  dispatch,
  editModalOpen,
  names,
  page,
  rowsPerPage,
  secondModalOpen,
  totalEntries,
  totalPages,
  user,
}) => {
  const fixed = false;
  const options = [
    { key: 1, text: "5", value: 5 },
    { key: 2, text: "10", value: 10 },
    { key: 3, text: "15", value: 15 },
  ];
  const router = useRouter();

  const [addNameError, setaddNameError] = useState(null);
  const [editName, setEditName] = useState({});
  const [error, setError] = useState();
  const [formState, setFormState] = useState({});

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await dispatch(actions.resetAllModals());
        // if state is deleted from store then logout
        if (!user.token) {
          await dispatch(AuthService.logout());
          router.push("/sign-in");
        } else {
          await dispatch(AuthService.authCheck());
          await dispatch(NameService.getNames(page, rowsPerPage));
          // console.log("auth check: success");
        }
      } catch (err) {
        setError(err.error);
        await dispatch(actions.authModalOpen());
      }
    };
    checkAuth();

    // close all modals on page unmount
    return () => {
      dispatch(actions.resetAllModals());
    };
  }, []);

  const handleAddChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const handleAddClose = async () => {
    await dispatch(actions.addModalClose());
    setFormState({});
  };

  const handleAddOpen = async () => {
    await dispatch(actions.addModalOpen());
  };

  const handleAddSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(NameService.addName(formState));
      await dispatch(NameService.getNames(page, rowsPerPage));
    } catch (err) {
      setaddNameError(err.error);
    } finally {
      await dispatch(actions.addModalClose());
      await dispatch(actions.secondModalOpen());
      setFormState({});
    }
  };

  const handleAuthClose = () => {
    router.push("/sign-in");
  };

  const handleDelete = async (key) => {
    await dispatch(NameService.deleteName(key));
    await dispatch(NameService.getNames(page, rowsPerPage));
  };

  const handleEdit = async (key) => {
    setEditName(...names.filter((name) => name.id == key));
    await dispatch(actions.editModalOpen());
  };

  const handleEditChange = (event) => {
    setEditName({ ...editName, [event.target.name]: event.target.value });
  };

  const handleEditClose = async () => {
    await dispatch(actions.editModalClose());
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    await dispatch(NameService.editName(editName));
    await dispatch(NameService.getNames(page, rowsPerPage));
    await dispatch(actions.editModalClose());
  };

  const handleLogout = async () => {
    try {
      await dispatch(AuthService.logout());
      router.push("/sign-in");
    } catch (err) {
      router.push("/sign-in");
    }
  };

  const handlePageChange = async (event, { activePage }) => {
    await dispatch(NameService.getNames(activePage, rowsPerPage));
  };

  const handleRowsPerPageChange = async (event, { value }) => {
    console.log(value);
    await dispatch(NameService.getNames(1, value));
  };

  const handleSecondClose = async () => {
    await dispatch(actions.secondModalClose());
  };

  const handleSignIn = () => {
    router.push("/sign-in");
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
                  <>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell colSpan="4" textAlign="center">
                          No rows to display
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </>
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
                            activePage={page}
                            firstItem={null}
                            lastItem={null}
                            pointing
                            secondary
                            inverted={true}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                          />
                          <Dropdown
                            text="Rows per page"
                            options={options}
                            closeOnChange
                            value={rowsPerPage}
                            onChange={handleRowsPerPageChange}
                          />
                          <Modal
                            open={addModalOpen}
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
                            onClose={handleAddClose}
                            onOpen={handleAddOpen}
                          >
                            <Header icon="user" content="Add new name" />
                            <Modal.Content>
                              <Form onSubmit={handleAddSubmit}>
                                <Form.Field>
                                  <Label basic={true}>First Name</Label>
                                  <Input
                                    name="firstName"
                                    placeholder="Enter first name"
                                    value={formState.firstName || ""}
                                    onChange={handleAddChange}
                                  />
                                </Form.Field>
                                <Form.Field>
                                  <Label basic={true}>Middle Name</Label>
                                  <Input
                                    name="middleName"
                                    placeholder="Enter middle name"
                                    value={formState.middleName || ""}
                                    onChange={handleAddChange}
                                  />
                                </Form.Field>
                                <Form.Field>
                                  <Label basic={true}>Last Name</Label>
                                  <Input
                                    name="lastName"
                                    placeholder="Enter last name"
                                    value={formState.lastName || ""}
                                    onChange={handleAddChange}
                                  />
                                </Form.Field>
                              </Form>
                            </Modal.Content>
                            <Modal.Actions>
                              <Button color="red" onClick={handleAddClose}>
                                <Icon name="remove" /> Cancel
                              </Button>
                              <Button color="green" onClick={handleAddSubmit}>
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
            onClose={handleSecondClose}
            open={secondModalOpen}
            size="small"
          >
            <Modal.Content>
              {addNameError == null ? (
                <p>New name added successfully</p>
              ) : (
                <p>{addNameError}</p>
              )}
            </Modal.Content>
            <Modal.Actions>
              <Button icon="check" content="Okay" onClick={handleSecondClose} />
            </Modal.Actions>
          </Modal>

          <Modal open={editModalOpen} onClose={handleEditClose}>
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
              <Button color="red" onClick={handleEditClose}>
                <Icon name="remove" /> Cancel
              </Button>
              <Button type="submit" form="editform" color="green">
                <Icon name="checkmark" /> Confirm
              </Button>
            </Modal.Actions>
          </Modal>

          <Modal size="mini" open={authModalOpen}>
            <Modal.Header></Modal.Header>
            <Modal.Content>
              <p>{error}. Please sign-in again.</p>
            </Modal.Content>
            <Modal.Actions>
              <Button color="orange" onClick={handleAuthClose}>
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
