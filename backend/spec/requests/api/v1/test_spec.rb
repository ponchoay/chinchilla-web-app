require 'rails_helper'

RSpec.describe '/api/v1/test', type: :request do
  it 'GET /api/v1/test' do
    get '/api/v1/test'
    expect(response).to have_http_status(:ok)
    expect(response.body).to include({ message: 'Hello, world!!' }.to_json)
  end
end
