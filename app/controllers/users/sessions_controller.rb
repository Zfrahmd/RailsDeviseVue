class Users::SessionsController < Devise::SessionsController
  respond_to :json
  
  private
  def respond_with(resource, _opts = {})
    render json: {
      message: 'You are Logged In',
      user: current_user
    }, status: :ok
  end

  def respond_to_on_destroy
    log_out_success && return if current_user

    log_out_failure
  end

  def log_out_success
    render json: { message: 'Logged out Successfully'}, status: :ok
  end

  def log_out_failure
    render json: { message: 'Problem occured during logging out'}, status: :unauthorized
  end

end