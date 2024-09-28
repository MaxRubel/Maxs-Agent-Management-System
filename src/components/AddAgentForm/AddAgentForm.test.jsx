import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import AddAgentForm from './AddAgentForm'
import { fetchingStore } from '../../store/FetchingStore'

describe('AddAgentForm', () => {
  beforeEach(() => {
    fetchingStore.dispatch({ type: 'RESET_STORE' });
    vi.stubGlobal('confirm', vi.fn(() => true));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });


  it('Creates a new agent', async () => {
    render(
      <Provider store={fetchingStore}>
        <AddAgentForm open={true} setIsOpen={() => { }} setEditAgent={() => { }} />
      </Provider>
    );

    // find the input fields
    const fullNameInput = screen.getByLabelText(/Full Name/i);
    const emailInput = screen.getByLabelText(/Email address/i);
    const departmentInput = screen.getByLabelText(/Department/i);
    const interestsInput = screen.getByLabelText(/Interests/i);

    // fill input fields
    await userEvent.type(fullNameInput, 'Test Agent Full Name');
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(departmentInput, 'Test Department');
    await userEvent.type(interestsInput, 'Test Interests');

    // verify input values
    expect(fullNameInput).toHaveValue('Test Agent Full Name');
    expect(emailInput).toHaveValue('test@example.com');
    expect(departmentInput).toHaveValue('Test Department');
    expect(interestsInput).toHaveValue('Test Interests');

    // Submit
    const submitButton = screen.getByRole('button', { name: /Submit/i });
    expect(submitButton).toBeInTheDocument();
    await userEvent.click(submitButton);

    await waitFor(() => {
      const storeState = fetchingStore.getState();
      const agents = storeState.agents.agents;

      // check the redux store
      const newAgent = agents.find(agent =>
        agent.fullName === 'Test Agent Full Name' &&
        agent.email === 'test@example.com' &&
        agent.department === 'Test Department' &&
        agent.interests === 'Test Interests'
      );

      expect(newAgent).toBeTruthy();
      expect(newAgent.id).toBeDefined();
    });
  });

  it('Updates an agent', async () => {
    //mock update object
    const updateObject = {
      id: 3,
      fullName: "Rachel Cohen",
      email: "rcohen@example.com",
      department: "Books",
      interests: "Literature, Yoga, Travel"
    }

    render(
      <Provider store={fetchingStore}>
        <AddAgentForm open={true} agentObj={updateObject} setIsOpen={() => { }} setEditAgent={() => { }} />
      </Provider>
    );

    const fullNameInput = screen.getByLabelText(/Full Name/i);
    const emailInput = screen.getByLabelText(/Email address/i);
    const departmentInput = screen.getByLabelText(/Department/i);
    const interestsInput = screen.getByLabelText(/Interests/i);

    // add new number to end of field
    await userEvent.type(fullNameInput, '2');
    await userEvent.type(emailInput, '2');
    await userEvent.type(departmentInput, '2');
    await userEvent.type(interestsInput, '2');

    // verify input values
    expect(fullNameInput).toHaveValue('Rachel Cohen2');
    expect(emailInput).toHaveValue('rcohen@example.com2');
    expect(departmentInput).toHaveValue('Books2');
    expect(interestsInput).toHaveValue('Literature, Yoga, Travel2');

    // Submit
    const submitButton = screen.getByRole('button', { name: /Submit/i });
    expect(submitButton).toBeInTheDocument();
    await userEvent.click(submitButton);

    // check the redux store
    await waitFor(() => {
      const storeState = fetchingStore.getState();
      const agents = storeState.agents.agents;

      const updatedAgent = agents.find(agent =>
        agent.fullName === 'Rachel Cohen2' &&
        agent.email === 'rcohen@example.com2' &&
        agent.department === 'Books2' &&
        agent.interests === 'Literature, Yoga, Travel2'
      );

      expect(updatedAgent).toBeTruthy();
      expect(updatedAgent.id).toBe(3);
    });
  });

  it('Deletes an agent', async () => {
    const updateObject = {
      id: 3,
      fullName: 'Rachel Cohen2',
      email: 'rcohen@example.com2',
      department: 'Books2',
      interests: 'Literature, Yoga, Travel2'
    }

    await waitFor(() => {
      const storeState = fetchingStore.getState();
      const agents = storeState.agents.agents;

      const originalAgent = agents.find(agent =>
        agent.fullName === 'Rachel Cohen2' &&
        agent.email === 'rcohen@example.com2' &&
        agent.department === 'Books2' &&
        agent.interests === 'Literature, Yoga, Travel2'
      );

      expect(originalAgent).toBeTruthy();
      expect(originalAgent.id).toBe(3);
    });

    render(
      <Provider store={fetchingStore}>
        <AddAgentForm open={true} agentObj={updateObject} setIsOpen={() => { }} setEditAgent={() => { }} />
      </Provider>
    );

    const deleteButton = screen.getByRole('button', { name: /Delete/i });
    expect(deleteButton).toBeInTheDocument();

    await userEvent.click(deleteButton);
    window.confirm = () => true

    await waitFor(() => {
      const storeState = fetchingStore.getState();
      const agents = storeState.agents.agents;

      const updatedAgent = agents.find(agent =>
        agent.fullName === 'Rachel Cohen2' &&
        agent.email === 'rcohen@example.com2' &&
        agent.department === 'Books2' &&
        agent.interests === 'Literature, Yoga, Travel2'
      );

      expect(updatedAgent).toBeFalsy()
    });
  });
});