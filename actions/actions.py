# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

# from typing import Any, Text, Dict, List
#
# from rasa_sdk import Action, Tracker
# from rasa_sdk.executor import CollectingDispatcher
#
#
# class ActionHelloWorld(Action):
#
#     def name(self) -> Text:
#         return "action_hello_world"
#
#     def run(self, dispatcher: CollectingDispatcher,
#             tracker: Tracker,
#             domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
#
#         dispatcher.utter_message(text="Hello World!")
#
#         return []
import csv
import os
from typing import Any, Text, Dict, List, Union
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
import pandas as pd
from rasa_sdk.events import SlotSet

class ActionGetDescription(Action):

    def name(self) -> Text:
        return "action_get_description"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
            
        section = tracker.get_slot('Sections')
        

        with open('data/sections.csv', 'r') as file:
            reader = csv.reader(file)
            for row in reader:
                if row[0].lower() == section.lower():
                    # description = row[1]
                    # dispatcher.utter_message(text=row[1])
                    return[SlotSet("description",row[1])]
            else:   
                description = "Sorry, I could not find a description for the section '{}'.".format(section)
        
        return [SlotSet("description", description)]