import {http, HttpResponse} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, screen} from '@testing-library/react'
import { describe, test, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { RequestInviteDialogTrigger } from '@/components/request-invite/dialog';


const server = setupServer(
  http.get('/greeting', () => {
    return HttpResponse.json({greeting: 'hello there'})
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Request Invite Dialog Trigger', () => {
  test('opens dialog when clicked', async () => {
    render(<RequestInviteDialogTrigger />)
  
    fireEvent.click(screen.getByText('Request an invite'))
  
    await screen.findAllByLabelText('Full Name')
  
    expect(screen.getByLabelText('Full Name')).toBeVisible()
    expect(screen.getByLabelText('Email')).toBeVisible()
    expect(screen.getByLabelText('Confirm Email')).toBeVisible()
  })
})
