class Api::V1::TestsController < ApplicationController
  def index
    render json: { message: 'Hello, world!!' }
  end
end
