import React from 'react';

export default function FormBooking() {
    return (
        <form class="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
    <div class="mb-6">
      <h4 class="text-lg font-semibold mb-4">Account</h4>
      <div class="mb-4 relative">
        <input type="text" placeholder="Full Name" class="w-full p-3 border rounded-lg"/>
        <div class="absolute inset-y-0 right-0 flex items-center pr-3">
          <i class="fa fa-user text-gray-400"></i>
        </div>
      </div>
      <div class="mb-4 relative">
        <input type="email" placeholder="Email Address" class="w-full p-3 border rounded-lg"/>
        <div class="absolute inset-y-0 right-0 flex items-center pr-3">
          <i class="fa fa-envelope text-gray-400"></i>
        </div>
      </div>
      <div class="mb-4 relative">
        <input type="password" placeholder="Password" class="w-full p-3 border rounded-lg"/>
        <div class="absolute inset-y-0 right-0 flex items-center pr-3">
          <i class="fa fa-key text-gray-400"></i>
        </div>
      </div>
    </div>
    <div class="mb-6 flex">
      <div class="w-1/2 pr-2">
        <h4 class="text-lg font-semibold mb-4">Date of Birth</h4>
        <div class="flex space-x-2">
          <input type="text" placeholder="DD" class="w-1/3 p-3 border rounded-lg"/>
          <input type="text" placeholder="MM" class="w-1/3 p-3 border rounded-lg"/>
          <input type="text" placeholder="YYYY" class="w-1/3 p-3 border rounded-lg"/>
        </div>
      </div>
      <div class="w-1/2 pl-2">
        <h4 class="text-lg font-semibold mb-4">Gender</h4>
        <div class="flex items-center space-x-4">
          <input id="gender-male" type="radio" name="gender" value="male" class="mr-2"/>
          <label for="gender-male" class="mr-4">Male</label>
          <input id="gender-female" type="radio" name="gender" value="female" class="mr-2"/>
          <label for="gender-female">Female</label>
        </div>
      </div>
    </div>
    <div class="mb-6">
      <h4 class="text-lg font-semibold mb-4">Payment Details</h4>
      <div class="mb-4 flex items-center space-x-4">
        <input id="payment-method-card" type="radio" name="payment-method" value="card" checked class="mr-2"/>
        <label for="payment-method-card" class="mr-4 flex items-center">
          <i class="fa fa-cc-visa mr-2 text-gray-400"></i>Credit Card
        </label>
        <input id="payment-method-paypal" type="radio" name="payment-method" value="paypal" class="mr-2"/>
        <label for="payment-method-paypal" class="flex items-center">
          <i class="fa fa-cc-paypal mr-2 text-gray-400"></i>Paypal
        </label>
      </div>
      <div class="mb-4 relative">
        <input type="text" placeholder="Card Number" class="w-full p-3 border rounded-lg"/>
        <div class="absolute inset-y-0 right-0 flex items-center pr-3">
          <i class="fa fa-credit-card text-gray-400"></i>
        </div>
      </div>
      <div class="flex">
        <div class="w-1/2 pr-2 relative">
          <input type="text" placeholder="Card CVC" class="w-full p-3 border rounded-lg"/>
          <div class="absolute inset-y-0 right-0 flex items-center pr-3">
            <i class="fa fa-user text-gray-400"></i>
          </div>
        </div>
        <div class="w-1/2 pl-2 flex space-x-2">
          <select class="w-1/2 p-3 border rounded-lg">
            <option>01 Jan</option>
            <option>02 Jan</option>
          </select>
          <select class="w-1/2 p-3 border rounded-lg">
            <option>2015</option>
            <option>2016</option>
          </select>
        </div>
      </div>
    </div>
    <div>
      <h4 class="text-lg font-semibold mb-4">Terms and Conditions</h4>
      <div class="flex items-center">
        <input id="terms" type="checkbox" class="mr-2"/>
        <label for="terms" class="text-sm">I accept the terms and conditions for signing up to this service, and hereby confirm I have read the privacy policy.</label>
      </div>
    </div>
  </form>
    );
}
