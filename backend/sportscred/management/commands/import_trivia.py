from yaml import load

from django.core.management.base import BaseCommand, CommandError

from sportscred.models import Sport, TriviaQuestion, TriviaAnswer


class Command(BaseCommand):
    help = "imports the questionnaires from a yaml"

    def add_arguments(self, parser):
        parser.add_argument("file", nargs="+", type=str)

    def handle(self, *args, **options):
        for input_file in options["file"]:
            with open(input_file, "r") as f:
                data = load(f.read())
            
            triva_questions = data["TriviaQuestion"]
            triva_answers = data["TriviaAnswer"]
            z = Sport.objects.get(name="Basketball")
            i = 0
            while (i < len(triva_questions)):
                question = triva_questions[i]
                answer = triva_answers[i]
                t = TriviaAnswer.objects.create(
                    content=answer["content"],
                    pk=answer["pk"],
                )
                t.save()
                s = TriviaQuestion.objects.create(
                    content=question["content"],
                    pk=question["pk"],
                    correct_answer = t
                )
                s.related_to_sport.add(z)
                s.save()
                t.parent_question = s
                t.save()
                i +=1
            x = i 
            while (x < len(triva_answers)):
                answer = triva_answers[x]
                if (answer == None):
                    break
                question = TriviaQuestion.objects.get(pk = answer["parent_question"])
                t = TriviaAnswer.objects.create(
                    content=answer["content"],
                    pk=answer["pk"],
                    parent_question = question
                )
                t.save()
                x += 1
               
                 
