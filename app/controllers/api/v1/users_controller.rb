module Api
  module V1
    class UsersController < ApplicationController
      before_action :set_user, only: %i[show destroy]

      def index
        @users = User.order(:cpf_cnpj)
        render json: @users
      end
    
      def show
        render json: @user
      end
    
      def create
        user = User.new(user_params)
        if user.valid?
          user.save
          render json: { message: 'User created successfully' }, status: :created
        else
          render json: { error: user.errors.full_messages }, status: :bad_request
        end
      end

      def destroy
        @user.destroy
      end
    
      private

      def set_user
        @user = User.find(params[:id])
      end
    
      def user_params
        params.require(:user).permit(:cpf_cnpj)
      end
    end
  end
end
